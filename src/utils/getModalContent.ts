import {
  experienceSection,
  knowledgeSection,
  learningSection,
  sections,
  type ICharacterItem,
  type IDefs,
  type ISection,
  type TLearningKeys,
} from "../global/constants";

export type TModalKey = keyof IDefs | TLearningKeys;

export interface ITableInfo {
  tableHead: Array<string>;
  tableBody: Array<Array<string>>;
}

export interface IResolvedSection extends ISection {
  tableInfo: ITableInfo;
}

const portraitCell = (item: ICharacterItem) =>
  item.portrait
    ? `<img src="${item.portrait}" alt="${item.label}" class="modal-img" />`
    : "";

const labelCell = (item: ICharacterItem) => `<p>${item.label}</p>`;

/**
 * Projects the canonical `items` list into the legacy table shape consumed by
 * ModalTable/Table, so content is only ever declared once.
 */
const buildTableInfo = (section: ISection): ITableInfo => ({
  tableHead: section.tableHead,
  tableBody: section.items.map((item) => [
    portraitCell(item),
    labelCell(item),
    ...(item.employer ? [item.employer] : []),
    item.role ?? "",
    ...(item.meta ?? []),
  ]),
});

const resolve = (section: ISection): IResolvedSection => ({
  ...section,
  tableInfo: buildTableInfo(section),
});

/**
 * Built once at module scope: every consumer does an O(1) lookup instead of
 * re-merging the section objects on each call.
 */
const resolvedSections = Object.fromEntries(
  Object.entries(sections).map(([key, section]) => [key, resolve(section)])
) as Record<TModalKey, IResolvedSection>;

const emptySection: IResolvedSection = {
  title: "",
  intro: "",
  tableHead: [],
  items: [],
  tableInfo: { tableHead: [], tableBody: [] },
};

const getModalContent = (modalType: TModalKey): IResolvedSection =>
  resolvedSections[modalType] ?? emptySection;

export { knowledgeSection, experienceSection, learningSection };
export default getModalContent;
