import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="QG Pharma | Admin Panel"
        description="This is the Login page for QG Pharma Admin Panel"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
