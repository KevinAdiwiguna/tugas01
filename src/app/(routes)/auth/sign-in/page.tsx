import BaseTemplate from "@/components/organisms/auth/BaseTemplate"
import { SignInForm } from "@/components/templates/auth/sign-in/SignInForm"

const Page =  () => {
  return (
    <BaseTemplate title="Sign-in Here" description="if you dont have account plase fuck me">
      <SignInForm />
    </BaseTemplate>
  )
}

export default Page