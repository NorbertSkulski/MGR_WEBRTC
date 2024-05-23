import { get } from "lodash";
import "./MainTable.scss";
import { CSSProperties } from "react";

type headerType = {
  key: string;
  name?: string;
  width?: string;
};

type MainTableType = {
  className?: string;
  headers: headerType[];
  data: Object[];
  style?: CSSProperties;
};

const MainTable = (props: MainTableType) => {
  const { className, headers, data, style } = props;
  return (
    <div className={`MainTable ${className}`} style={style}>
      <table>
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th
                style={{
                  maxWidth: header?.width,
                  minWidth: header?.width,
                  width: header?.width,
                }}
                key={`${header?.key}-${index}`}
              >
                {header?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={`DataTr-${index}`}>
              {headers?.map((header, idx) => (
                <td
                  style={{
                    maxWidth: header?.width,
                    minWidth: header?.width,
                    width: header?.width,
                  }}
                  key={`DataTd-${idx}`}
                >
                  {get(data, header.key, "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
