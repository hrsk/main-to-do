import {ChangeEvent, ComponentProps, ElementType, KeyboardEvent, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


type EditableComponentOwnProps<E extends ElementType = ElementType> = {
    children?: string
    as?: E
    initialValue: string
    callback: (value: string) => void
}

type EditableComponentProps<E extends ElementType> = EditableComponentOwnProps<E> &
    Omit<ComponentProps<E>, keyof EditableComponentOwnProps>

// type EditableComponentProps<T extends ElementType> = {
//     initialValue: string;
//     callback: (value: string) => void;
//     as?: T;
//     children?: ReactNode;
// } & Omit<ComponentProps<T>, "children" | "onDoubleClick">;

const __DEFAULT_ELEMENT__ = 'h3' as const;

export const EditableComponent = <E extends ElementType = "span">({
                                                                      initialValue,
                                                                      callback,
                                                                      as,
                                                                      children,
                                                                      ...rest
                                                                  }: EditableComponentProps<E>) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null);

    const Component = as || __DEFAULT_ELEMENT__;

    const callbackHandler = () => {
        const trimmed = value.trim();
        if (trimmed) {
            callback(trimmed);
            setEditMode(false);
        } else {
            setError("Title is required!");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        if (error) setError(null);
    };

    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "Enter" && e.metaKey) {
            callbackHandler();
        }
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            {editMode ? (
                <TextField
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={callbackHandler}
                    onKeyDown={onKeyDownHandler}
                    autoFocus
                    error={!!error}
                    label={error || "Enter a title"}
                    variant="outlined"
                    size="small"
                />
            ) : (
                <Component onDoubleClick={() => setEditMode(true)} {...rest}>
                    {value}
                </Component>
            )}
        </Box>
    );
};