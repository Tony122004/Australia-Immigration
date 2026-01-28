// src/i18n/resources.ts

import en_common from "../locales/en/common.json";
import en_layout from "../locales/en/layout.json";
import en_chat from "../locales/en/chat.json";
import en_assessment from "../locales/en/assessment.json";
import en_documents from "../locales/en/documents.json";

import vi_common from "../locales/vi/common.json";
import vi_layout from "../locales/vi/layout.json";
import vi_chat from "../locales/vi/chat.json";
import vi_assessment from "../locales/vi/assessment.json";
import vi_documents from "../locales/vi/documents.json";

export const resources = {
  en: {
    common: en_common,
    layout: en_layout,
    chat: en_chat,
    assessment: en_assessment,
    documents: en_documents,
  },
  vi: {
    common: vi_common,
    layout: vi_layout,
    chat: vi_chat,
    assessment: vi_assessment,
    documents: vi_documents,
  },
} as const;

export type AvailableLanguages = keyof typeof resources;
export type Namespace = keyof typeof resources["en"];