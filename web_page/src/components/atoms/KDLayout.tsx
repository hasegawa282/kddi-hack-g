// DefaultLayout.tsx
// import { Footer } from "../layout/Footer";

export interface DefaultLayoutProps {
    children?: React.ReactNode;
  }
  
  export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const { children } = props;
    return (
      <>
        {children}
        {/* <Footer /> */}
      </>
    );
  };