import { NextRequest, NextResponse } from 'next/server';
import { validateDownloadToken, generateSignedUrl, incrementDownloadCount } from '@/lib/storage';

/**
 * GET /api/downloads/[token]
 *
 * Validates the download token from the purchase confirmation email,
 * generates a fresh signed URL from Supabase Storage, and redirects
 * the customer to download their product.
 *
 * Query params:
 *   ?item=0  (optional) - index of the item in a multi-item order
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } },
) {
  const { token } = params;

  if (!token) {
    return NextResponse.json({ error: 'Missing download token' }, { status: 400 });
  }

  // Validate the download token
  const order = await validateDownloadToken(token);

  if (!order) {
    return NextResponse.json(
      {
        error: 'Invalid or expired download link',
        message: 'This download link is invalid or has expired. Please contact support at hello@creativelynanda.co.za for assistance.',
      },
      { status: 403 },
    );
  }

  // Determine which file to serve
  const itemIndex = parseInt(request.nextUrl.searchParams.get('item') || '0', 10);

  // Get file path from order items or from the linked product
  let filePath: string | null = null;
  let fileName = 'download';

  // Check order items array first (multi-item orders)
  const orderItems = (order.items as Array<{ name: string; file_path?: string }>) || [];

  if (orderItems.length > 0 && orderItems[itemIndex]) {
    filePath = orderItems[itemIndex].file_path || null;
    fileName = orderItems[itemIndex].name;
  }

  // Fallback: get from the linked product
  if (!filePath && order.products?.file_path) {
    filePath = order.products.file_path;
    fileName = order.products.name;
  }

  if (!filePath) {
    return NextResponse.json(
      {
        error: 'No downloadable file found',
        message: 'The product file has not been uploaded yet. Please contact support at hello@creativelynanda.co.za.',
      },
      { status: 404 },
    );
  }

  // Generate a fresh signed URL (valid for 1 hour for the actual download)
  const { url, error } = await generateSignedUrl(filePath, 3600);

  if (!url || error) {
    console.error('Failed to generate download URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate download link. Please try again.' },
      { status: 500 },
    );
  }

  // Track the download
  await incrementDownloadCount(order.id);

  // Redirect to the signed URL
  return NextResponse.redirect(url);
}
