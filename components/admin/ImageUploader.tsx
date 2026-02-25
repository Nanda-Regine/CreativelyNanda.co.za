'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2, ImageIcon, AlertCircle, GripVertical } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  maxImages?: number;
  label?: string;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: 'uploading' | 'done' | 'error';
  error?: string;
}

export function ImageUploader({
  images,
  onChange,
  folder = 'products',
  maxImages = 12,
  label = 'Gallery Screenshots',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canAddMore = images.length + uploading.filter(u => u.progress === 'uploading').length < maxImages;

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    const valid = fileArray.filter(f => {
      if (!allowed.includes(f.type)) return false;
      if (f.size > 20 * 1024 * 1024) return false;
      return true;
    });

    if (valid.length === 0) return;

    // How many more can we add?
    const remaining = maxImages - images.length;
    const toUpload = valid.slice(0, remaining);

    const newUploading: UploadingFile[] = toUpload.map(f => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      progress: 'uploading' as const,
    }));

    setUploading(prev => [...prev, ...newUploading]);

    const uploadPromises = toUpload.map(async (file, idx) => {
      const uploadId = newUploading[idx].id;
      try {
        const url = await uploadFile(file);
        setUploading(prev =>
          prev.map(u => u.id === uploadId ? { ...u, progress: 'done' } : u)
        );
        return url;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed';
        setUploading(prev =>
          prev.map(u => u.id === uploadId ? { ...u, progress: 'error', error: msg } : u)
        );
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const newUrls = results.filter((u): u is string => u !== null);

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }

    // Clear done/error uploads after a short delay
    setTimeout(() => {
      setUploading(prev => prev.filter(u => u.progress === 'uploading'));
    }, 2000);
  }, [images, maxImages, onChange, folder]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleRemove = async (url: string) => {
    onChange(images.filter(img => img !== url));
    // Also delete from storage
    try {
      await fetch('/api/admin/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
    } catch {
      // Ignore delete errors - image is removed from list either way
    }
  };

  const clearError = (id: string) => {
    setUploading(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-navy">
          {label}{' '}
          <span className="text-navy/40 font-normal">(up to {maxImages} images, JPG/PNG/WebP, max 20MB each)</span>
        </label>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          images.length >= maxImages
            ? 'bg-amber-100 text-amber-700'
            : images.length >= 5
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-navy/10 text-navy/60'
        }`}>
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Existing images grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <AnimatePresence>
            {images.map((url, i) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-navy/5 border border-navy/10"
              >
                <Image
                  src={url}
                  alt={`Screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {/* Order badge */}
                <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-navy/70 backdrop-blur-sm text-white text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {/* Drag handle (visual only) */}
                <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                  <GripVertical className="w-4 h-4 text-white drop-shadow" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Uploading indicators */}
      <AnimatePresence>
        {uploading.map(u => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
              u.progress === 'error'
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            {u.progress === 'uploading' && (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
            )}
            {u.progress === 'done' && (
              <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0" />
            )}
            {u.progress === 'error' && (
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
            <span className={`flex-1 truncate ${u.progress === 'error' ? 'text-red-700' : 'text-blue-700'}`}>
              {u.progress === 'uploading' && `Uploading ${u.name}...`}
              {u.progress === 'done' && `${u.name} uploaded`}
              {u.progress === 'error' && (u.error || `Failed to upload ${u.name}`)}
            </span>
            {u.progress === 'error' && (
              <button type="button" onClick={() => clearError(u.id)} className="text-red-500 hover:text-red-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Drop zone */}
      {canAddMore && (
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            isDragging
              ? 'border-cherry bg-cherry/5 scale-[1.01]'
              : 'border-navy/20 hover:border-cherry/50 hover:bg-cherry/5'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isDragging ? 'bg-cherry/10' : 'bg-navy/5'
          }`}>
            {isDragging
              ? <ImageIcon className="w-6 h-6 text-cherry" />
              : <Upload className="w-6 h-6 text-navy/40" />
            }
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-navy">
              {isDragging ? 'Drop images here' : 'Upload screenshots'}
            </p>
            <p className="text-xs text-navy/50 mt-0.5">
              Drag & drop or click · JPG, PNG, WebP · Max 20MB each
            </p>
            <p className="text-xs text-navy/40 mt-0.5">
              {maxImages - images.length} slot{maxImages - images.length !== 1 ? 's' : ''} remaining
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={e => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      )}

      {!canAddMore && images.length > 0 && (
        <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          Maximum {maxImages} images reached. Remove one to add another.
        </p>
      )}

      {images.length < 5 && images.length > 0 && (
        <p className="text-xs text-navy/50">
          Add at least {5 - images.length} more screenshot{5 - images.length !== 1 ? 's' : ''} (minimum 5 recommended)
        </p>
      )}
    </div>
  );
}
