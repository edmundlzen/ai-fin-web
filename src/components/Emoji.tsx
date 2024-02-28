import emojis from "~/emojis.json";

export default function Emoji({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <img
      src={emojis[name as keyof typeof emojis] || emojis["white-question-mark"]}
      alt={name}
      className={className}
    />
  );
}
