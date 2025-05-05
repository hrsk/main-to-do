import {ChangeEvent, Fragment, JSX, KeyboardEvent, ReactNode, useState} from "react"

type Props = {
    initialValue: string
    callback: (value: string) => void
    render: (text: string, onDoubleClick: () => void) => JSX.Element
}

export const EditableSpan = ({initialValue, callback, render}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(() => initialValue)
    const [error, setError] = useState<string | null>(null)

    const callbackHandler = () => {
        const trimmedValue = value.trim()
        if (trimmedValue !== "") {
            callback(trimmedValue)
            setEditMode(false)
        } else {
            setError("Title is required!")
        }
        if (value === "") {
            setError("Title is required!")
        }
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        callbackHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        const {key} = e
        if (key === "Enter" && e.metaKey) {
            deactivateEditMode()
        }
        if (error !== null) {
            setError(null)
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {editMode ? (
                <input
                    placeholder={"Enter a title"}
                    className={error ? "error" : undefined}
                    value={value}
                    autoFocus={true}
                    onChange={onChangeHandler}
                    onBlur={deactivateEditMode}
                    onKeyDown={onKeyPressHandler}
                />
            ) : (
                <Children>{render(value, () => activateEditMode())}</Children>
            )}
            {
                error && <span className={error ? 'error-message' : undefined}>{error}</span>
            }
        </div>
    )
}

type ChildrenProps = {
    children: ReactNode
}

const Children = ({children}: ChildrenProps) => {
    return <Fragment>{children}</Fragment>
}
