interface Props {
  children: React.ReactNode,
}
export default function TeamCard(props: Props) {
  return (
    <div className="bg-pink-100 hover:bg-pink-200 active:bg-pink-300">
      {props.children}
    </div>
  );
}
