export const NoData = ({ data }) => {
  return (
    data.length == 0 && (
      <p style={{ marginTop: "5rem", textAlign: "center" }}>목록이 없습니다.</p>
    )
  );
};
