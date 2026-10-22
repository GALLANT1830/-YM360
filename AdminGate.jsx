import { Loader2, ShieldAlert, LogIn } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import Page from "@/components/common/Page";
import PageHeader from "@/components/common/PageHeader";
import Notice from "@/components/common/Notice";
import { Button } from "@/components/ui/button";

export default function AdminGate({ kicker = "Admin", title, desc, children }) {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

  if (isLoadingAuth) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <Page>
        <PageHeader kicker={kicker} title={title} desc={desc} />
        <Notice tone="warn" title="Sign in required">Only signed-in admins can manage this content.</Notice>
        <Button className="mt-4" onClick={() => navigateToLogin()}><LogIn className="mr-2 h-4 w-4" />Sign in</Button>
      </Page>
    );
  }

  if (user?.role !== "admin") {
    return (
      <Page>
        <PageHeader kicker={kicker} title={title} desc={desc} />
        <Notice tone="warn" title="Admins only">
          <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4" />Your account does not have admin access. Ask a workspace admin to invite you as an admin.</span>
        </Notice>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader kicker={kicker} title={title} desc={desc} />
      {children}
    </Page>
  );
}