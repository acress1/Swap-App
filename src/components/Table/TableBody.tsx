import matchesSearch from "utils/matchesSearch";
import { swapDataItem } from "types";

const TableBody = ({ swapData, search }: {
    swapData: swapDataItem[],
    search: string
}) => {

    const filteredSwapData = swapData.filter(dataItem => matchesSearch({ dataItem, search }));

    return (
        <>
            <tbody>
                {filteredSwapData && filteredSwapData.length > 0 ? (
                    filteredSwapData
                        .map((dataItem, index) => (

                            <tr key={index}>
                                <td className="Date">{dataItem.Date}</td>
                                <td className="Outbound">{dataItem.Outbound}</td>
                                <td className="Inbound">{dataItem.Inbound}</td>
                                <td className="Position">{dataItem.Position}</td>
                                <td>
                                    <a
                                        className="Email"
                                        href={`mailto:${dataItem.Email}`}
                                        target="_blank"
                                        rel="noreferrer">
                                        {dataItem.Email}
                                    </a>
                                </td>
                                <td className="FOR"></td>
                                <td className="FOR">
                                    <input
                                        className="nohover"
                                        type="checkbox"
                                        defaultChecked={dataItem.Early}
                                    >
                                    </input>
                                </td>
                                <td className="FOR">
                                    <input
                                        className="nohover"
                                        type="checkbox"
                                        defaultChecked={dataItem.Late}
                                    >
                                    </input>
                                </td>
                                <td className="FOR">
                                    <input
                                        className="nohover"
                                        type="checkbox"
                                        defaultChecked={dataItem.LTA}
                                    >
                                    </input>
                                </td>
                                <td className="FOR">
                                    <input
                                        className="nohover"
                                        type="checkbox"
                                        defaultChecked={dataItem.DO}
                                    >
                                    </input>
                                </td>
                                <td className="FOR">{dataItem.Note}</td>
                                <td className="Sent">{dataItem.Sent}</td>
                            </tr>
                        ))
                ) : (
                    <tr>
                        <td colSpan={12}>
                            No shift yet. Add yours 🤓
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    );
};

export default TableBody;