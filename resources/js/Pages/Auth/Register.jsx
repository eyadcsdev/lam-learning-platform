import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

export default function Register() {
  return (
    <AuthShell
      variant="register"
      title="ابدأ رحلتك معنا"
      subtitle="أنشئ حسابك المجاني وانطلق من سطر الكود الأول إلى مشروعك الأول."
    >
      <RegisterForm />
    </AuthShell>
  )
}
