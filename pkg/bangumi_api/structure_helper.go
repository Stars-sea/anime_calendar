package bangumi_api

type StructureHelper struct {
}

func NewStructureHelper() *StructureHelper {
	return &StructureHelper{}
}

func (h *StructureHelper) GetSubjectTypeName(s *Subject) (string, error) {
	return s.GetTypeName()
}
