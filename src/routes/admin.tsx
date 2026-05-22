import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';
import { getAdminIdentity } from '~/server/content';

/**
 * Admin layout. `/admin/*` is fronted by Cloudflare Access in production;
 * the loader re-verifies the identity (defence in depth) and redirects home
 * if there is none.
 */
export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin · LeanWise AI' }] }),
  loader: async () => {
    const admin = await getAdminIdentity();
    if (!admin) throw redirect({ to: '/' });
    return { admin };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { admin } = Route.useLoaderData();
  return (
    <div>
      <header className="adm-bar">
        <div className="lw-container">
          <div className="row">
            <Link to="/admin" className="brand">
              LeanWise <span className="tag">Admin</span>
            </Link>
            <div className="right">
              <span className="who">{admin.email}</span>
              <Link to="/">View site →</Link>
            </div>
          </div>
        </div>
      </header>
      <div className="adm-main">
        <div className="lw-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
