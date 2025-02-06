import {
  experienceSection,
  knowledgeSection,
  type IDefs,
} from "../global/constants";

export type IModalContent = Record<
  keyof IDefs,
  {
    title: string;
    content: string;
    tableInfo: {
      tableHead: Array<string>;
      tableBody: Array<Array<string>>;
    };
  }
>;

const getModalContent = (modalType: keyof IDefs) => {
  const defs: IModalContent = {
    ...knowledgeSection,
    ...experienceSection,
  };
  return (
    defs?.[modalType] || {
      title: "",
      content: "",
      tableInfo: { tableHead: [], tableBody: [] },
    }
  );
};

export default getModalContent;
