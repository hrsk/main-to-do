import {ChangeEvent, KeyboardEvent, useRef, useState} from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"


type Props = {
    onCreateItem: (value: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const removeInputFocus = () => inputRef.current?.blur()
    const errorInputFocus = () => inputRef.current?.focus()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const callbackHandler = () => {
        const trimmedValue = value.trim()
        if (trimmedValue !== "") {
            onCreateItem(trimmedValue)
            removeInputFocus()
            setValue("")
        } else {
            setError('Title is required!')
            errorInputFocus()
        }
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

    return (
        <Box>
            <TextField
                label={"Enter a title"}
                variant={"outlined"}
                inputRef={inputRef}
                value={value}
                size={"small"}
                error={!!error}
                helperText={error}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
            />
            <IconButton onClick={callbackHandler} color={"primary"}>
                <AddBoxIcon/>
            </IconButton>
        </Box>
    )
}
