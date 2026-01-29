import { Diary } from 'sheet_data/diary_database_sheet/diary';

/**
 * Web アプリのエントリーポイント
 * @returns {HtmlOutput} HTML ページ
 */
global.doGet = () => {
  return HtmlService.createHtmlOutputFromFile('diary_input')
    .setTitle('日記入力')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
};

/**
 * 日記を保存する
 * @param {string} text - 日記の内容
 */
global.saveDiary = (text) => {
  if (!text || text.trim() === '') {
    throw new Error('日記の内容が空です。');
  }
  Diary.save(text);
};
