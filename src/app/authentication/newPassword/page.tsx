import NewPasswordMiddleware from "@/src/components/authentication/newPassword/NewPasswordMiddleware";
import "./newPassword.css";

export default function page() {
  return (
    <div className="grid newPassword__container">
      <div className="newPassword__content">
        <NewPasswordMiddleware />
      </div>
    </div>
  );
}
