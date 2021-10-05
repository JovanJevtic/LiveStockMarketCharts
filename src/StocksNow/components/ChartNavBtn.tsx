interface Props {
  range: string;
  isActive: boolean;
}

const ChartNavBtn: React.FC<Props> = ({ range, isActive }) => {
  return (
    <div>
      <p>{range}</p>
    </div>
  );
};

export default ChartNavBtn;
