import BaseTemplate from "@/components/organisms/auth/BaseTemplate"
import SignUpForm from "@/components/templates/auth/sign-up/SignUpForm"

const Page = () => {
  return (
    <BaseTemplate title="Sign-up Here" description="if you dont have account plase fuck me">
      <SignUpForm />
    </BaseTemplate>
  )
}

export default Page