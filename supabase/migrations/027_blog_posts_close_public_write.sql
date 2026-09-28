-- 027 — blog_posts: close the public write policy.
--
-- 001_blog_and_poetry_engagement.sql created "blog_posts_service_write" as
-- FOR ALL USING (true) WITH CHECK (true) with no TO clause, so it applied to the
-- anon role. The service role bypasses RLS and never needed it. Applied to
-- production on 2026-09-28; recorded here so a rebuild from migrations matches.
-- Writers: admin server actions and scripts/publish-press.mjs (service role).

DROP POLICY IF EXISTS blog_posts_service_write ON public.blog_posts;
