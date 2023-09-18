import SwiftUI
import WatchConnectivity
import Combine
import Speech

struct ContentView: View {
    @ObservedObject var viewModel: TranscriptionViewModel
    @ObservedObject var aiModel: AIViewModel
    @StateObject var audioRecorder = AudioRecorder()

    var body: some View {
        TabView {
            VStack {
                Text(viewModel.liveTranscription)
                    .padding()
                if let res = aiModel.result {
                    Text(res)
                        .contextMenu {
                            Button(action: {
                                UIPasteboard.general.string = res
                            }) {
                                Text("Copy")
                            }
                        }
                        .padding()
                }
                List(viewModel.transcriptionSegments.reversed(), id: \.self) { segment in
                    Text(segment)
                        .onTapGesture {
                            self.viewModel.liveTranscription = segment
                        }
                        .contextMenu {
                            Button(action: {
                                UIPasteboard.general.string = segment
                            }) {
                                Text("Copy")
                            }
                        }
                }
                HStack {
                    Button(action: {
                        if audioRecorder.isRecording {
                            audioRecorder.stopRecording()
                        } else {
                            audioRecorder.startRecording()
                        }
                        if viewModel.isTranscribing {
                            viewModel.stopLiveTranscription()
                        } else {
                            viewModel.startLiveTranscription()
                        }
                    }) {
                        Image(systemName: audioRecorder.isRecording ? "stop.fill" : "circle.fill")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 50, height: 50)
                    }
                    .padding()
                    Button(action: {
                        Task { await aiModel.send(text: viewModel.liveTranscription) }
                    }) {
                        Image(systemName: "brain")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 50, height: 50)
                    }
                }
            }.tabItem {
                Label("Record", systemImage: "square.and.pencil").padding()
            }
            RecordingsView().tabItem {
                Label("History", systemImage: "list.dash").padding()
            }
        }
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(viewModel: TranscriptionViewModel(), aiModel: AIViewModel())
    }
}
