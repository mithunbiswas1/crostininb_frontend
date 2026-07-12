import {
  // Frontend
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,

  // Backend
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiSpringboot,
  SiDotnet,
  SiPhp,
  SiLaravel,

  // Databases
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,

  // Cloud & DevOps
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,

  // APIs
  SiGraphql,

  // UI/UX Design Tools
  SiFigma,
  SiSketch,
  SiMiro,
  SiFramer,
  SiWebflow,
  SiCanva,
  SiHotjar,

  // Mobile (if needed)
  SiSwift,
  SiKotlin,
  SiDart,
  SiFlutter,
  SiGooglemaps,
  SiSelenium,
  SiShopify,
  SiWoo,
  SiBigcommerce,
  SiAlpinedotjs,
  SiRubyonrails,
  SiStripe,
  SiPaypal,
  SiRazorpay,
  SiAlgolia,
  SiGoogleanalytics,
  SiMailchimp,

  // AI & Automation Icons
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiLangchain,
  SiHuggingface,
  SiOpenai,
  SiUipath,
  SiZapier,
  SiMake,
  SiPandas,
  SiApachespark,
  SiApachekafka,
  SiOpencv,
  SiGooglecloud,

  // SEO Tools
  SiSemrush,
  SiGooglesearchconsole,
  SiYoast,
  SiGoogleads,
  SiPagespeedinsights,

  // Digital Marketing Tools
  SiGoogletagmanager,
  SiMixpanel,
  SiInstagram,
  SiTiktok,
  SiHubspot,
  SiHootsuite,
  SiBuffer,
} from "react-icons/si";

import { FaJava, FaAws } from "react-icons/fa";
import {
  TbApi,
  TbBrandAzure,
  TbBrandTwitter,
  TbBrandLinkedin,
  TbTable,
  TbChartBar,
} from "react-icons/tb";
import { BsBluetooth } from "react-icons/bs";

import { H2, P } from "@/components/ui/Typography";

// Map icon strings to actual icon components
const iconMap = {
  // Frontend
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNextdotjs,

  // Backend
  SiNodedotjs,
  SiPython,
  SiDjango,
  FaJava,
  SiSpringboot,
  SiDotnet,
  SiPhp,
  SiLaravel,

  // Databases
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,

  // Cloud & DevOps
  FaAws,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,

  // APIs
  SiGraphql,
  TbApi,

  // UI/UX Tools
  SiFigma,
  SiSketch,
  SiMiro,
  SiFramer,
  SiWebflow,
  SiCanva,
  SiHotjar,

  // Mobile
  SiSwift,
  SiKotlin,
  SiDart,
  SiFlutter,
  SiGooglemaps,
  BsBluetooth,
  SiSelenium,

  // E-Commerce Platforms
  SiShopify,
  SiWoo,
  SiBigcommerce,
  SiAlpinedotjs,
  SiRubyonrails,
  SiStripe,
  SiPaypal,
  SiRazorpay,
  SiAlgolia,
  SiGoogleanalytics,
  SiMailchimp,

  // AI & Automation Icons
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiLangchain,
  SiHuggingface,
  SiOpenai,
  SiUipath,
  SiZapier,
  SiMake,
  SiPandas,
  SiApachespark,
  SiApachekafka,
  SiOpencv,
  SiGooglecloud,
  TbBrandAzure,

  // SEO Tools
  SiSemrush,
  SiGooglesearchconsole,
  SiYoast,
  SiGoogleads,
  SiPagespeedinsights,

  // Digital Marketing Tools
  SiGoogletagmanager,
  SiMixpanel,
  SiInstagram,
  SiTiktok,
  SiHubspot,
  SiHootsuite,
  SiBuffer,

  TbBrandTwitter,
  TbBrandLinkedin,
  TbTable,
  TbChartBar,
};

export default function TechStackSection({ techStackData }) {
  return (
    <section className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 lg:mb-20">
          <div>
            <H2 className="font-bold">{techStackData.heading}</H2>
          </div>

          <div>
            <P className="text-gray-600">{techStackData.description}</P>
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
          {techStackData.technologies.map((tech) => {
            const Icon = iconMap[tech.icon];

            return (
              <div key={tech.name} className="flex items-center gap-4">
                {Icon && <Icon className="text-2xl shrink-0" />}
                <span className="font-medium text-gray-800">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
