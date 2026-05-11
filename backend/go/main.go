package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

func main() {
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		redisURL = "redis://localhost:6379/0"
	}

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatalf("Failed to parse Redis URL: %v", err)
	}

	rdb := redis.NewClient(opt)

	fmt.Println("GITCODE Go Execution Bridge Online")
	fmt.Printf("Connected to Redis at %s\n", redisURL)

	// Subscribe to execution requests
	pubsub := rdb.Subscribe(ctx, "execution_requests")
	defer pubsub.Close()

	for {
		msg, err := pubsub.ReceiveMessage(ctx)
		if err != nil {
			log.Printf("Redis error: %v", err)
			continue
		}

		fmt.Printf("Received execution request: %s\n", msg.Payload)
		// Here we would handle PTY multiplexing and Vercel Sandbox SDK calls
		// For now, we acknowledge the request
		rdb.Publish(ctx, "execution_events", fmt.Sprintf("ACK: %s", msg.Payload))
	}
}
