package bangumi_api

type StructureHelper struct {
}

func NewStructureHelper() *StructureHelper {
	return &StructureHelper{}
}

func (h *StructureHelper) GetSubjectTypeName(s *Subject) (string, error) {
	return s.GetTypeName()
}

func (h *StructureHelper) GetCollectionTypeName(ctype int) (string, error) {
	return GetCollectionTypeName(ctype)
}

func (h *StructureHelper) GetUserGroupTypeName(user *User) (string, error) {
	return user.GetUserGroupTypeName()
}
