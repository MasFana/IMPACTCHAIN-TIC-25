import { AuthLayout } from "~/components/layouts/auth-layout"
import { LoginForm } from "~/components/auth/login-form"

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
