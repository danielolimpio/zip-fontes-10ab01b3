import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página não encontrada - Zip Fontes</title>
        <meta name="description" content="A página que você procura não foi encontrada. Volte para a página inicial do Zip Fontes." />
        <link rel="canonical" href="https://zipfontes.com.br/" />
        <meta property="og:title" content="Página não encontrada - Zip Fontes" />
        <meta property="og:description" content="A página que você procura não foi encontrada. Volte para a página inicial do Zip Fontes." />
        <meta property="og:url" content="https://zipfontes.com.br/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://zipfontes.com.br/favicon.png" />
      </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
