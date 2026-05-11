import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata = {
  title: "إنشاء حساب · منصة لام",
  description: "ابدأ رحلتك المجانية في تعلّم البرمجة بالعربية على منصة لام.",
}

export default function RegisterPage() {
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
