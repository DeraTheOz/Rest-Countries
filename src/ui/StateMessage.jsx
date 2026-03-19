function StateMessage({ title, message, actionLabel, onAction }) {
  return (
    <section className="mx-auto my-16 max-w-2xl rounded-[0.3125rem] bg-white px-6 py-10 text-center shadow-md dark:bg-blue-900">
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        <p className="text-sm leading-6 sm:text-base">{message}</p>

        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-[0.3125rem] bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-950 dark:bg-white dark:text-blue-950 dark:hover:bg-slate-100"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default StateMessage;
