// Подписываем в названии Input - таким образом показываем, что данные передаются на бек и там обновятся в бд

export interface CurrentUserInputInterface {
  username: string,
  position: string,
  password: string,
  avatar: File
}
