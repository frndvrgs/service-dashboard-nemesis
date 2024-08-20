import { AuthProvider } from "../../context/AuthContext";

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  );
};

export default ServiceLayout;
