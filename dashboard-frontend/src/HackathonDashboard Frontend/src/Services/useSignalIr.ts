  // import { useEffect, useState } from "react";
  // import * as signalR from "@microsoft/signalr";

  // interface UseSignalROptions<T> {
  //   url: string;       
  //   method: string;    
  //   initialValue?: T;  
  // }

  // export function useSignalR<T = any>({ url, method, initialValue }: UseSignalROptions<T>) {
  //   const [data, setData] = useState<T | undefined>(initialValue);

  //   useEffect(() => {
  //     let connection = new signalR.HubConnectionBuilder()
  //       .withUrl(url)
  //       .withAutomaticReconnect()
  //       .build();

  //     const startConnection = async () => {
  //       try {
  //         if (connection.state === signalR.HubConnectionState.Disconnected) {
  //           await connection.start();
  //           console.log("✅ SignalR Connected:", url);
  //         }

  //         connection.on(method, (message: T) => {
  //           setData(message);
  //         });
  //       } catch (err) {
  //         console.error("❌ SignalR Connection Error:", err);
  //         setTimeout(startConnection, 5000);
  //       }
  //     };

  //     startConnection();

  //     return () => {
  //       if (connection) {
  //         connection.off(method);
  //         connection.stop();
  //       }
  //     };
  //   }, [url, method]);

  //   return data;
  // }

  import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface UseSignalROptions<T> {
  url: string;
  method: string;
  initialValue?: T;
}

export function useSignalR<T = any>({ url, method, initialValue }: UseSignalROptions<T>) {
  const [data, setData] = useState<T | undefined>(initialValue);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    let conn = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(conn);

    const startConnection = async () => {
      try {
        if (conn.state === signalR.HubConnectionState.Disconnected) {
          await conn.start();
          console.log("✅ SignalR Connected:", url);
        }

        conn.on(method, (message: T) => {
          setData(message);
        });
      } catch (err) {
        console.error("❌ SignalR Connection Error:", err);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    return () => {
      conn.off(method);
      conn.stop();
    };
  }, [url, method]);

  return { data, connection };
}
