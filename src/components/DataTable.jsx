/**
 * A compact results table. `columns` entries may set `align` and `mono`, and a
 * row may set `highlight` to mark the best-performing entry.
 */
export default function DataTable({ caption, columns, rows }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b border-line">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`whitespace-nowrap px-5 py-3 font-semibold text-heading ${
                    column.align === 'right' ? 'text-right' : ''
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.key ?? index}
                className={`border-b border-line last:border-b-0 ${
                  row.highlight ? 'bg-accent/5' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-3 ${column.align === 'right' ? 'text-right' : ''} ${
                      column.mono ? 'font-mono text-sm' : ''
                    } ${
                      column.key === columns[0].key
                        ? `font-medium ${row.highlight ? 'text-accent' : 'text-heading'}`
                        : ''
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
