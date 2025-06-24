import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";

import DashboardHeader from "@/components/DashboardHeader";
import SupportForm from "@/features/support/components/SupportForm";

export const Route = createFileRoute("/_authenticated/_dashboard/support")({
  component: () => <SupportComponent />,
});

function SupportComponent() {
  return (
    <section className="flex flex-col gap-3">
      <div className="pt-4 bg-secondary sticky top-0 z-10">
        <DashboardHeader icon={QuestionMarkCircledIcon} title="Support" />
      </div>
      <div className="flex items-start flex-wrap gap-4">
        <SupportForm />
      </div>
    </section>
  );
}
