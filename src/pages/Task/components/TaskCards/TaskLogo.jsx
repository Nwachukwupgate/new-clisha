function TaskLogo({ item }) {
  return (
    <div className="row m-0 header  py-3 ">
      <div className="col-12 text-center py-2 p-0">
        {item?.token?.photo ? (
          <img src={item?.token?.photo} className="link " alt="" />
        ) : (
          <h4 className="task_name">{item?.token?.name}</h4>
        )}
      </div>

      {item.type !== 'website_click' && (
        <img src="/images/website_watermark.png" className="watermark" alt="" />
      )}
    </div>
  );
}

export default TaskLogo;
