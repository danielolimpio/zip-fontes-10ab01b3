import { writeFileSync } from "fs";
import { resolve } from "path";
import { allSeoRoutes } from "../src/lib/seoData";
import { buildSitemap } from "./prerender-routes";

writeFileSync(resolve("public/sitemap.xml"), buildSitemap(allSeoRoutes), "utf-8");
console.log(`[sitemap] public/sitemap.xml atualizado com ${allSeoRoutes.length} URLs indexáveis`);
