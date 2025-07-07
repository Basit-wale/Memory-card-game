const Card = ({ img, onClick }) => {
  return (
    <div
      className="h-fit w-fit flex flex-col gap-2 p-2 bg-zinc-900 rounded-md shadow-md hover:shadow-2xl"
      onClick={onClick}
    >
      <img src={img} alt="" className="w-40" />
    </div>
  );
};

export default Card;
