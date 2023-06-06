package network

import "fmt"

type ApiError struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Details     struct {
		Path   string `json:"path"`
		Method string `json:"method"`
		Error  string `json:"error,omitempty"`
	} `json:"details"`
}

func (n *ApiError) Error() string {
	return fmt.Sprintf("%s: %s", n.Title, n.Description)
}
