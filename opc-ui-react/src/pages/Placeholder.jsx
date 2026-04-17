/**
 * Placeholder - 占位页面组件
 * 用于尚未迁移的页面
 */
export function Placeholder({ title }) {
  return (
    <>
      <div className="breadcrumb">页面 / {title}</div>
      <h1 className="page-title">{title}</h1>
      <section className="card">
        <p>此页面正在迁移中，敬请期待...</p>
      </section>
    </>
  );
}
