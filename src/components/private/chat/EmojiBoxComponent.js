import React from 'react'

const EmojiBoxComponent = ( {choseEmoji} ) => {
  return (
    <div className='emojiBox'>
        <span onClick={choseEmoji}>☀️</span>
        <span onClick={choseEmoji}>☁️</span>
        <span onClick={choseEmoji}>☂️</span>
        <span onClick={choseEmoji}>☃️</span>
        <span onClick={choseEmoji}>☔</span>
        <span onClick={choseEmoji}>⚡</span>
        <span onClick={choseEmoji}>❄️</span>
        <span onClick={choseEmoji}>⛅</span>
        <span onClick={choseEmoji}>⏰</span>
        <span onClick={choseEmoji}>⌛</span>

        <span onClick={choseEmoji}>❓</span>
        <span onClick={choseEmoji}>❔</span>
        <span onClick={choseEmoji}>❗</span>
        <span onClick={choseEmoji}>❕</span>
        <span onClick={choseEmoji}>❌</span>
        <span onClick={choseEmoji}>✋</span>
        <span onClick={choseEmoji}>✊</span>
        <span onClick={choseEmoji}>✌</span>

        <span onClick={choseEmoji}>⚽</span>
        <span onClick={choseEmoji}>⚾</span>
        <span onClick={choseEmoji}>❤</span>
        <span onClick={choseEmoji}>☕</span>
        <span onClick={choseEmoji}>✍</span>
        <span onClick={choseEmoji}>✨</span>
        <span onClick={choseEmoji}>⭐</span>
        <span onClick={choseEmoji}>⛪</span>
    </div>
  )
}

export default EmojiBoxComponent