import {ChangeEvent, KeyboardEvent, useRef, useState} from "react"
import {Button} from "./button/Button.tsx";

type Props = {
    onCreateItem: (value: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const removeInputFocus = () => inputRef.current?.blur()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const callbackHandler = () => {
        const trimmedValue = value.trim()
        if (trimmedValue !== "") {
            onCreateItem(trimmedValue)
        } else {
            setError("Title is required!")
            removeInputFocus()
        }

        if (value === "" && error === null) {
            removeInputFocus()
        }
        setValue("")
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        const key = e.key
        if (key === "Enter" && e.metaKey) {
            callbackHandler()
        }
        if (error !== null) {
            setError(null)
        }
    }

    const onBlurHandler = () => {
        if (value === "" && error === null) {
            removeInputFocus()
        }
        const trimmedValue = value.trim()
        if (trimmedValue !== "") {
            onCreateItem(trimmedValue)
            setValue("")
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'baseline'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <input
                    className={error ? 'error' : undefined}
                    placeholder={"Enter a title"}
                    ref={inputRef}
                    value={value}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}
                />
                {
                    error && <span className={error ? 'error-message' : undefined}>{error}</span>
                }
            </div>
            <Button title={'+'} onClick={callbackHandler}/>
        </div>
    )
}
