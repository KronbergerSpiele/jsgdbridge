import { KIND as ButtonKind } from 'baseui/button'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal'
import * as React from 'react'

export type ScoreProps = {
  score: null | number
  onCompleted(): void
}

export const Score: React.FC<ScoreProps> = function Score({
  score,
  onCompleted,
}) {
  return (
    <Modal
      onClose={onCompleted}
      closeable
      isOpen={score !== null}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Great score: {score}</ModalHeader>
      <ModalBody>
        {`"I ran deep into the Kellergewoelbe. Beat my ${score} steps at https://kronbergerspiele.github.io/kellergewoelbenlauf/!"`}
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary} onClick={onCompleted}>
          Cancel
        </ModalButton>
        <ModalButton onClick={onCompleted}>Share</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
