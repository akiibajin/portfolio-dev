import {
  experienceSection,
  knowledgeSection,
  learningSection,
  type IDefs,
  type TLearningKeys,
} from "../global/constants";

export type TModalKey = keyof IDefs | TLearningKeys;

export type IModalContent = Record<
  TModalKey,
  {
    title: string;
    content: string;
    tableInfo: {
      tableHead: Array<string>;
      tableBody: Array<Array<string>>;
    };
  }
>;

const getModalContent = (modalType: TModalKey) => {
  const defs: IModalContent = {
    ...knowledgeSection,
    ...experienceSection,
    ...learningSection,
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