import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export default function Login() {
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
