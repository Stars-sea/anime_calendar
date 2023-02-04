package network

import "time"

type cache struct {
	MicroTimeStamp int64
	Data           []byte
}

func newCache(data []byte) *cache {
	return &cache{
		MicroTimeStamp: time.Now().UnixMicro(),
		Data:           data,
	}
}

func (c *cache) ComputeDuration(now int64) int64 {
	return now - c.MicroTimeStamp
}

//
// ---------- Cache Map ----------

const maxSizeInBytes = 10000000 // 10 Mb

var cacheMap = make(map[string]cache)

func ClearCache() {
	for k := range cacheMap {
		delete(cacheMap, k)
	}
}

func StartCacheReleaseTicker() *time.Ticker {
	ticker := time.NewTicker(30 * time.Second)
	go func() {
		for {
			<-ticker.C
			ClearCache()
		}
	}()
	return ticker
}

func put(key string, data []byte) bool {
	if len(data) > maxSizeInBytes {
		return false
	}

	cacheMap[key] = *newCache(data)
	return true
}

func get(key string) ([]byte, bool) {
	if c, ok := cacheMap[key]; ok {
		return c.Data, true
	}

	return nil, false
}
