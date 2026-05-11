import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "تسجيل الدخول · منصة لام",
  description: "ادخل إلى حسابك على منصة لام لمتابعة رحلتك في تعلّم البرمجة.",
}

export default function LoginPage() {
  return (
    <AuthShell
      variant="login"
      title="مرحباً بعودتك"
      subtitle="سجّل الدخول لمتابعة رحلتك في عالم البرمجة من حيث توقّفت."
    >
      <LoginForm />
    </AuthShell>
  )
}
