import { CheckCircle, Lock } from "phosphor-react";
import { isPast } from "date-fns";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  }).format(new Date(props.availableAt));

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${
          isActiveLesson ? "bg-green-500" : ""
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                isActiveLesson ? "text-white" : "text-blue-500"
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded py-[0.125re] px-2 text-white border  font-bold ${
              isActiveLesson ? "border-white" : "border-green-300"
            } `}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={` mt-5 block ${
            isActiveLesson ? "text-white" : "text-gray-200"
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
