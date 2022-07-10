// DefaultLayout.tsx
// import { Footer } from "../layout/Footer";

export interface DefaultLayoutProps {
    children?: React.ReactNode;
  }
  
  export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const { children } = props;
    return (
      <div style={{width: '100%', height: '100vh'}}>
        {children}
        {/* <Footer /> */}
      </div>
    );
  };

