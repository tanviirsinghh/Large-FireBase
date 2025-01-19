import { cn } from "../lib/utils";
import {Marquee} from "../components/magicui/marquee";
import g from '../assets/react.svg';
import typescript from '../assets/typescript.png';
import tailwind from '../assets/tailwind.png';
import packages from '../assets/npm.svg';
import backend from '../assets/cloudflare.svg';
import language from '../assets/hono.png';
import library from '../assets/aceternity.png';
import orm from '../assets/prismaorm.png';
import database from '../assets/sql-server.png';


const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "React Js",
    img: g,
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Typescript",
    img:typescript,
  },
  {
    name: "John",
    username: "@john",
    body: "CSS Library",
    img: tailwind
  },
  {
    name: "Jane",
    username: "@jane",
    body: " For Custom Package",
    img: packages,
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Serverless BackEnd",
    img: backend
  },
  {
    name: "James",
    username: "@james",
    body: "Backend Language",
    img:language
  },
  {
    name: "James",
    username: "@james",
    body: "UI Library",
    img: library
  }
  ,
  {
    name: "James",
    username: "@james",
    body: "O R M",
    img:orm
  },{
    name: "James",
    username: "@james",
    body: " SQL Database",
    img:database
  },
  
];

const firstRow = reviews;
const ReviewCard = ({
  img,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-32 cursor-pointer overflow-hidden rounded-sm  m-6",
      )}
    >
      <div className="flex  h-20 flex-row justify-center items-center gap-4">
        <img className="rounded-full" width="70" height="70" alt="img" src={img}/>
      </div>
      <blockquote className="mt-2 font-mono text-sm text-center ">{body}</blockquote>
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
