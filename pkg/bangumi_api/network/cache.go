package network

import (
	"sync"
	"time"
)

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

var cacheMap = sync.Map{}

func ClearCache() {
	cacheMap = sync.Map{}
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

func SetCache(key string, data []byte) bool {
	if len(data) > maxSizeInBytes {
		return false
	}

	cacheMap.Store(key, *newCache(data))
	return true
}

func GetCache(key string) ([]byte, bool) {
	if c, ok := cacheMap.Load(key); ok {
		return c.(cache).Data, true
	}

	return nil, false
}
